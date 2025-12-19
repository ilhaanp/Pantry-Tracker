"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import { Typography, Box, Stack, TextField, IconButton, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddItems() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !quantity) return;

        try {
            await addDoc(collection(db, "items"), {
                name: name,
                quantity: Number(quantity),
            });
            setName("");
            setQuantity("");

        } catch (err) {
            console.error("Error adding document: ", err);
        }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                pt={6}
            >
                {/* title */}
                <Typography variant="h4" fontWeight="bold">
                    PANTRY TRACKER
                </Typography>
                {/* input fields */}
                <Stack direction="row" spacing={2} mt={4}>
                    <TextField
                    label="Item Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth
                    />
                    <TextField
                    label="Qty" type="number"  value={quantity} onChange={(e) => setQuantity(e.target.value)} sx={{ width: 120 }}
                    />
                    <IconButton type="submit" color="primary" sx={{ height: 56}} aria-label="add" onSubmit = {handleSubmit}>
                        <AddIcon />
                    </IconButton>
                </Stack>
            </Box> 
        </form>

        
    );
}