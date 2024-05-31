sed -i '' 's/db-path/development/g' prisma/schema.prisma
rm -r prisma/migrations
npx prisma migrate dev
sed -i '' 's/development/db-path/g' prisma/schema.prisma


sed -i '' 's/db-path/test/g' prisma/schema.prisma
rm -r prisma/migrations
npx prisma migrate dev
sed -i '' 's/test/db-path/g' prisma/schema.prisma


sed -i '' 's/db-path/production/g' prisma/schema.prisma
rm -r prisma/migrations
npx prisma migrate dev
sed -i '' 's/production/db-path/g' prisma/schema.prisma


