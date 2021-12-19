import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "fjaka",
            password: "krXKK9DbD2P7HPFZvkaVXxYaLEuP7pcPj2bHjL5svBNXWV3bY579PpmkcQy9",
            database: "fjaka",
            entities: ["src/**/**.entity{.ts,.js}"],
            // synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}
