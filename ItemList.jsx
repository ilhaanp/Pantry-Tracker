"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Box, TextField, IconButton, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';

export default function ItemList() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadImmediately = onSnapshot(
            collection(db, "items"),
            (querySnapshot) => {
                const itemsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    quantity: doc.data().quantity,
                }));
                setItems(itemsArray);
                console.log("Fetched items:", itemsArray);
            },
            (error) => {
                console.error("Error fetching items", error);
            }
        );
        return () => loadImmediately();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "items", id));
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error deleting item: ", err);
        }
    };

    const searchedItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{
             p: 6, 
             display:"flex",
             flexDirection: "column",
             alignItems: "center"
             }}
        >
            <TextField
                label="Search Item"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{ maxWidth: 500, mb: 3 }}
            />

            {searchedItems.length === 0 ? (
                <p>No items found</p>
            ) : (
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        width: "100%",
                        maxWidth: 500,
                        p: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        My Items
                    </Typography>
                    <List>
                        {searchedItems.map((item) => (
                            <div key={item.id}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`Quantity: ${item.quantity}`}
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
}
