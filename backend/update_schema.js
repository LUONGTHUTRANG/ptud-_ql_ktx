import db from "./config/db.js";

const updateSchema = async () => {
  try {
    console.log("Updating database schema...");
    await db.query(`
      ALTER TABLE registrations 
      MODIFY COLUMN status ENUM('PENDING', 'AWAITING_PAYMENT', 'APPROVED', 'COMPLETED', 'REJECTED', 'CANCELLED', 'RETURN') DEFAULT 'PENDING'
    `);
    console.log("Successfully added 'RETURN' to registrations status enum.");
    process.exit(0);
  } catch (error) {
    console.error("Error updating schema:", error);
    process.exit(1);
  }
};

updateSchema();
