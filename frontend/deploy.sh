echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying app..."
scp -r dist/* root@68.183.83.127:/var/www/68.183.83.127/

echo "Deployment complete!"