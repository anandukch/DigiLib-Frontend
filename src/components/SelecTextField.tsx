import { Chip, List, ListItemButton, ListItemText, TextField } from "@mui/material"


const SelectTextField = ({ label, name, onChange, listClickHandler, items, type = "user" }) => {

  return (
    <>
      <TextField
        label={label}
        fullWidth
        sx={{ mt: 2 }}
        onChange={onChange}
        name={name}
      />
      {
        items.length > 0 && (
          <div style={{ position: 'relative' }}>
            <List style={{ top: '100%', left: 0, right: 0, zIndex: 1, maxHeight: "210px", overflow: "auto" }}>
              {items.map((result: any, index: number) => (
                <ListItemButton
                  key={result.id}
                  style={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}
                  onClick={() => listClickHandler(result)}
                >
                  {
                    type === "user" ?
                      <ListItemText primary={result.name} secondary={result.reg_no} />
                      : <ListItemText primary={result.title} secondary={result.ISBN} />

                  }
                  {
                    type == "book" && (
                      <Chip label={result.available ? "available" : "not available"} color="success" />
                    )
                  }

                </ListItemButton>
              ))}
            </List>
          </div>
        )
      }
    </>
  )
}

export default SelectTextField;