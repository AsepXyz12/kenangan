// Seed the Owner account (AsepXyz). Run with: npm run db:seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const ownerUsername = process.env.OWNER_USERNAME || "AsepXyz";
  const ownerPassword = process.env.OWNER_PASSWORD || "ChangeThisPassword123!";

  const existing = await prisma.user.findUnique({ where: { username: ownerUsername } });
  if (existing) {
    console.log(`Owner "${ownerUsername}" already exists, skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(ownerPassword, 12);

  await prisma.user.create({
    data: {
      username: ownerUsername,
      passwordHash,
      displayName: "AsepXyz",
      role: "OWNER_UTAMA",
      status: "ACTIVE",
    },
  });

  console.log(`Owner account created: ${ownerUsername} / ${ownerPassword}`);
  console.log("IMPORTANT: log in and change this password immediately.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
