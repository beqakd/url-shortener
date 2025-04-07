import 'tsconfig-paths/register'; // Add this line

import { PrismaService } from "nestjs-prisma";
import { RootSeeder } from "../libs/common/src";
import { faker } from "@faker-js/faker";
import { UrlModuleSeeder } from '../src/url/seeder/module.seeder';

export async function callSeeder(seeder: RootSeeder) {
    console.log("callSeeder");
    await seeder.call(UrlModuleSeeder);
}

const prisma = new PrismaService();
callSeeder(new RootSeeder(faker, prisma))
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
