import db from "./config/db.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    console.log("Seeding data...");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const managerPassword = await bcrypt.hash("manager123", 10);
    const studentPassword = await bcrypt.hash("student123", 10);

    // 1. Seed Admin
    console.log("Seeding Admin...");
    // Check if admin exists to avoid duplicates if run multiple times, or just delete
    await db.query("DELETE FROM admins");
    await db.query(
      "INSERT INTO admins (username, password_hash, full_name) VALUES (?, ?, ?)",
      ["admin", adminPassword, "System Administrator"]
    );

    // 2. Seed Managers
    console.log("Seeding Managers...");
    await db.query("DELETE FROM managers");
    // Assuming buildings 1 and 2 exist. If not, set building_id to NULL or ensure buildings are seeded first.
    // We will assume the main SQL script has been run which inserts buildings.
    const managers = [
      [
        "manager1",
        "manager1@ktx.com",
        managerPassword,
        "Manager One",
        "0901234561",
        1,
        1,
      ],
      [
        "manager2",
        "manager2@ktx.com",
        managerPassword,
        "Manager Two",
        "0901234562",
        1,
        2,
      ],
    ];

    // Note: If buildings table is empty, this might fail due to FK constraint.
    // Ideally we should check or insert buildings here too, but the user asked for admins, managers, students.
    // I'll wrap in try-catch specifically for managers to give a hint if it fails.
    try {
      await db.query(
        "INSERT INTO managers (username, email, password_hash, full_name, phone_number, is_first_login, building_id) VALUES ?",
        [managers]
      );
    } catch (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        console.warn(
          "Warning: Could not insert managers with building_id. Make sure 'buildings' table is populated."
        );
        // Fallback: Insert without building_id if allowed, or just fail.
        // Schema says building_id can be NULL?
        // FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE SET NULL
        // Yes, it can be null. Let's try inserting with NULL if the first attempt fails?
        // Or just let it fail and user needs to run the SQL script first.
        // The user said "read create ktx db.sql for details", which implies that structure is there.
        throw err;
      } else {
        throw err;
      }
    }

    // 3. Seed Students
    console.log("Seeding Students...");
    const students = [
      [
        "20225001",
        studentPassword,
        "Nguyen Van A",
        "sv001@student.com",
        "0912345671",
        "MALE",
        "CNTT1",
        "STUDYING",
        "NOT_STAYING",
      ],
      [
        "20225002",
        studentPassword,
        "Tran Thi B",
        "sv002@student.com",
        "0912345672",
        "FEMALE",
        "KT1",
        "STUDYING",
        "NOT_STAYING",
      ],
      [
        "20225003",
        studentPassword,
        "Le Van C",
        "sv003@student.com",
        "0912345673",
        "MALE",
        "CNTT2",
        "STUDYING",
        "NOT_STAYING",
      ],
      [
        "20225004",
        studentPassword,
        "Pham Thi D",
        "sv004@student.com",
        "0912345674",
        "FEMALE",
        "NNA1",
        "STUDYING",
        "NOT_STAYING",
      ],
      [
        "20225005",
        studentPassword,
        "Hoang Van E",
        "sv005@student.com",
        "0912345675",
        "MALE",
        "DT1",
        "STUDYING",
        "NOT_STAYING",
      ],
    ];
    await db.query(
      "INSERT INTO students (mssv, password_hash, full_name, email, phone_number, gender, class_name, student_status, stay_status) VALUES ?",
      [students]
    );

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
