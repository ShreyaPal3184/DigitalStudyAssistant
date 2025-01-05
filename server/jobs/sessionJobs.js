import sql from "mssql";
import config from "../controller/config.js";

export const updateSessionStatuses = async () => {
  try {
    let pool = await sql.connect(config);

    // Update sessions that have ended
    await pool.request()
      .query("UPDATE sessions SET is_active = 0, status = 'completed' WHERE end_time < GETDATE() AND is_active = 1 AND status = 'scheduled'");

    // Update sessions that were missed (never started)
    await pool.request()
      .query("UPDATE sessions SET is_active = 0, status = 'missed' WHERE start_time < GETDATE() AND status = 'scheduled' AND is_active = 1");

    console.log("Session statuses updated successfully.");
  } catch (err) {
    console.error("Error updating session statuses:", err.message);
  }
};
