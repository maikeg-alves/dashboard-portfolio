import FormProject from './formProject/formProject.componet';
import FormTechnology from './formTechnology/formTechnology.componet';
import TableItems from './Table/TableItem.component';
import Table from './Table/Table.component';
import { useModal, Modal } from './modal/modal.component';
import GetView from './GetView/GetView.component';
import Delete from './Delete/Delete.component';
import ErrorMessage from './ErrorMessage/ErrorMessage.component';
export { LoadingPage } from './loadingPage';
export { PutItem } from './PutItem/PutItem.component';

export { LoginComponet } from './auth/login';
export { RecoveryComponent } from './auth/recovery';
export { ConfirmCodeComponent } from './auth/confirmCode';
export { ChangePasswordComponent } from './auth/changePassword';
export { AuthTwoStep } from './auth/authTwoStep';

export {
  TableItems,
  Table,
  Modal,
  useModal,
  FormProject,
  FormTechnology,
  GetView,
  Delete,
  ErrorMessage,
};
