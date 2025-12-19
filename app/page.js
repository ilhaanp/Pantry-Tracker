import { Container, Paper, Stack } from "@mui/material";
import AddItems from "../AddItems";
import ItemList from "../ItemList";

export default function Home() {
  return (
    <Container maxWidth={false} sx={{ px: 4 }}>
      <Paper
        elevation={0}
        sx={{
          minHeight: "100vh",
          p: 4,
          borderRadius: 0,
        }}
      >
        <Stack spacing={4}>
          <AddItems />
          <ItemList />
        </Stack>
      </Paper>
    </Container>
  );
}
