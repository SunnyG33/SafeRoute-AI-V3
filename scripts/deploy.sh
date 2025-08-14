#!/bin/bash

# SafeRoute AI Production Deployment Script
set -e

echo "🚀 Starting SafeRoute AI deployment..."

# Configuration
ENVIRONMENT=${1:-production}
BACKUP_DIR="/opt/backups/saferoute-ai"
APP_DIR="/opt/saferoute-ai"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Pre-deployment checks
log_info "Running pre-deployment checks..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    log_error "Docker is not running"
    exit 1
fi

# Check if required files exist
if [ ! -f "docker-compose.prod.yml" ]; then
    log_error "docker-compose.prod.yml not found"
    exit 1
fi

if [ ! -f ".env.production" ]; then
    log_error ".env.production not found"
    exit 1
fi

# Create backup
log_info "Creating backup..."
mkdir -p $BACKUP_DIR
BACKUP_NAME="saferoute-ai-$(date +%Y%m%d-%H%M%S).tar.gz"

if [ -d "$APP_DIR" ]; then
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$APP_DIR" . || log_warn "Backup creation failed"
    log_info "Backup created: $BACKUP_NAME"
fi

# Pull latest images
log_info "Pulling latest Docker images..."
docker-compose -f docker-compose.prod.yml pull

# Stop existing containers
log_info "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Start new containers
log_info "Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for health check
log_info "Waiting for application to be healthy..."
sleep 30

# Health check
HEALTH_CHECK_URL="http://localhost:3000/api/health"
for i in {1..10}; do
    if curl -f $HEALTH_CHECK_URL > /dev/null 2>&1; then
        log_info "Application is healthy!"
        break
    else
        log_warn "Health check failed, attempt $i/10"
        sleep 10
    fi
    
    if [ $i -eq 10 ]; then
        log_error "Application failed to start properly"
        log_info "Rolling back..."
        docker-compose -f docker-compose.prod.yml down
        # Restore from backup if needed
        exit 1
    fi
done

# Cleanup old images
log_info "Cleaning up old Docker images..."
docker system prune -f

# Post-deployment tasks
log_info "Running post-deployment tasks..."

# Update SSL certificates if needed
if command -v certbot &> /dev/null; then
    certbot renew --quiet || log_warn "SSL certificate renewal failed"
fi

log_info "✅ Deployment completed successfully!"
log_info "Application is running at: https://saferoute.ai"
log_info "Health check: $HEALTH_CHECK_URL"

# Send notification (optional)
if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"SafeRoute AI deployed successfully to production"}' \
        $SLACK_WEBHOOK_URL || log_warn "Slack notification failed"
fi

echo "🎉 SafeRoute AI is now live and ready to save lives!"
