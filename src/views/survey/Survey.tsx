import {
  Paper,
  Button,
  Container,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import useTablePageState from "../../hooks/useTablePageState";
import PageModal from "../../components/PageModal";
import SurveyForm from "./SurveyForm";
import { useGetSurveyList } from "../../stores/SurveyStore";
import PageCircularProgress from "../../components/PageCircularProgress";
import ListNotFound from "../../components/ListNotFound";

interface ISurveyItemProps {
  handleEdit: (id: number) => void;
  id: number;
  title: string;
  date: Date;
}
const SurveyItem = (props: ISurveyItemProps) => {
  const { handleEdit, id, title } = props;

  return (
    <ListItem disablePadding onClick={() => handleEdit(id)}>
      <ListItemButton>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
const Survey = () => {
  const {
    open,
    currentId,
    handleClickOpen,
    handleClose,
    handleEdit,
    isEdit,
    formCallback,
  } = useTablePageState();
  const theme = useTheme();

  const { data = [], isLoading, isError } = useGetSurveyList();
  if (isLoading) {
    return (
      <PageCircularProgress/>
    );
  }
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Button onClick={handleClickOpen} variant="outlined" color="success">
          Anket Ekle
        </Button>

       { data.length>0?<List>
          {data.map((t: any, index: any) => 
            <SurveyItem
              key={t.id}
              date={t.createDate}
              id={t.id}
              title={t.title}             
              handleEdit={handleEdit}
            />
          )}
        </List>: <ListNotFound/>}
        <PageModal
          title="Anket"
          backgroundColor={theme.palette.grey[100]}
          fullScreen
          isOpen={open}
          handleClose={handleClose}
        >
          <SurveyForm editId={currentId!} callback={formCallback} />
        </PageModal>
      </Paper>
    </Container>
  );
};

export default Survey;
