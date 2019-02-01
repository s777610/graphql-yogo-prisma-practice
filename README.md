# graphql-yogo-prisma-practice






## Prisma
Prisma is GraphQL ORM which can turn your database into a GraphQL API. It supports multiple databases such as MySQL, PostgreSQL, MongoDB, and so on.<br>

Install Prisma globally
```
npm install -g prisma
```
Connect Prisma to a database
To set up Prisma, you have to install Docker first
```
prisma init <folder name>
```

After creating new folder, you can run
```
cd <folder name>
```
```
docker-compose up -d
```

Deploy your Prisma server
```
prisma deploy
```
Open browser and go to http://localhost:4466/




## Docker 
```
docker-compose kill
```

```
docker-compose down
```

```
docker-compose up -d
```