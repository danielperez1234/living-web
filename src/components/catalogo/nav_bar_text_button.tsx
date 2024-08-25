import { Button } from "@mui/material"

interface localProps {
    title: String;
    onClick: () => void;
}

export default function NavBarTextButton({ title, onClick }: localProps) {
    return (
        <Button
            variant="text"
            sx={{ textTransform: 'none', fontWeight: '300' }}
            color="info"
            onClick={onClick}
        >
            {title}
        </Button>
    )
}