import express from "express";
import dotenv from "dotenv";
import { db } from "./db.js";
import { pantryItems } from "./schema.js";
import { asc, eq } from "drizzle-orm";

dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

app.use(express.json());
const router = express.Router();

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// GET root
app.get("/", (req, res) => {
    res.send("Hello from Pantry Items API");
});

// GET all items
router.get("/", async (req, res) => {
    try {
        const allItems = await db
            .select()
            .from(pantryItems)
            .orderBy(asc(pantryItems.expirationDate));

        res.status(200).json(allItems);
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// id: serial("id").primaryKey(),      //id is the primary key and it is serial, meaning it will be auto incremented per added item
//     name: varchar("name", { length: 100 }).notNull(),
//     quantity: integer("quantity", { limit: 100 }).notNull(),
//     unit: varchar("unit", { length: 50 }).notNull(),
//     expirationDate: date("expiration_date").notNull(),
//     createdAt: timestamp("created_at").defaultNow(),
// });

// POST new item
router.post("/", async (req, res) => {
    try {
        const { name, quantity, unit, expirationDate } = req.body;
        const [insertedItem] = await db
            .insert(pantryItems)
            .values({ name, quantity: Number(quantity), unit, expirationDate })
            .returning();
        res.status(200).json(insertedItem);
    } catch (error) {
        console.log("Error:" + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// /PUT update quantity
router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, quantity, unit, expirationDate } = req.body;

        const [updatedItem] = await db
            .update(pantryItems)
            .set({ name, quantity: Number(quantity), unit, expirationDate })
            .where(eq(pantryItems.id, id))
            .returning();

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// /DELETE an item
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [deletedItem] = await db
            .delete(pantryItems)
            .where(eq(pantryItems.id, id))
            .returning();

        res.status(200).json(deletedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api/v1/items", router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
