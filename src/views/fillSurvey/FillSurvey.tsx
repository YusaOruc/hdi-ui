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
import { useGetSurveyList } from "../../stores/SurveyStore";
import FillSurveyForm from "./FillSurveyForm";
import PageCircularProgress from "../../components/PageCircularProgress";
import ListNotFound from "../../components/ListNotFound";

interface IFillSurveyItemProps {
  handleEdit: (id: number) => void;
  id: number;
  title: string;
  date: Date;
}
const FillSurveyItem = (props: IFillSurveyItemProps) => {
  const { handleEdit, id, title } = props;

  return (
    <ListItem disablePadding onClick={() => handleEdit(id)}>
      <ListItemButton>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
const FillSurvey = () => {
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
  if (data.length===0) {
    return (
      <ListNotFound/>
    );
  }

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Paper sx={{ p: 2 }}>
        <List>
          {data.map((t: any, index: any) => (
            <FillSurveyItem
              key={t.title}
              date={t.createDate}
              id={t.id}
              title={t.title}
              handleEdit={handleEdit}
            />
          ))}
        </List>
        <PageModal
          title="Ankete Katıl"
          backgroundColor={theme.palette.grey[100]}
          fullScreen
          isOpen={open}
          handleClose={handleClose}
        >
          <FillSurveyForm editId={currentId!} />
        </PageModal>
      </Paper>
    </Container>
  );
};

export default FillSurvey;
