import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Technology } from './styles';

import { AiFillPlusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  TableItems,
  Table,
  Modal,
  useModal,
  GetView,
  Delete,
  TechManagementForm,
  LoadingPage,
  /*   PutItem, */
} from '@components';
import { ITech, Provaider } from '@interfaces';
import { sortByCreatedAt } from '@utils';
import { SelecteComponet, SetComponet } from 'src/interfaces/component';

interface PropsMain extends Provaider {
  selectedComponent: number;
  mode: 'techs' | 'projects';
  update?: boolean;
  id?: number | null;
  hide: () => void;
}

const Techs: React.FC<Provaider> = (props) => {
  const [techs, setTechs] = React.useState<ITech[]>([]);
  const { isShown, toggle } = useModal();
  const [appData, setAppData] = React.useState<PropsMain>({
    ...props,
    selectedComponent: SetComponet.CREATE,
    mode: 'techs',
    update: false,
    id: null,
    hide: toggle,
  });

  const handleGet = () => {
    setAppData({
      ...appData,
      techs: props.techs,
      selectedComponent: SetComponet.GET,
    });
    !isShown && toggle();
  };

  const handleCreate = () => {
    setAppData({
      ...appData,
      update: false,
      selectedComponent: SetComponet.CREATE,
    });
    !isShown && toggle();
  };

  const handleUpdate = (id: number) => {
    const selectedTech = props.techs.find((p) => p.id === id);

    if (selectedTech) {
      setAppData({
        ...appData,
        update: true,
        techs: [selectedTech] || [],
        selectedComponent: SetComponet.UPDATE,
      });
    }
    !isShown && toggle();
  };

  const handleDelete = (id: number) => {
    const selectedTech = props.techs.find((p) => p.id === id);

    if (selectedTech) {
      setAppData({
        ...appData,
        id,
        techs: [selectedTech] || [],
        selectedComponent: SetComponet.DELETE,
      });
    }

    !isShown && toggle();
  };

  React.useEffect(() => {
    setTechs(props.techs || []);
    setAppData({
      ...props,
      ...appData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.techs, props]);

  const currentComponent: SelecteComponet = {
    [SetComponet.GET]: (
      <GetView {...appData} SetDelete={handleDelete} SetUpdate={handleUpdate} />
    ),
    [SetComponet.DELETE]: <Delete {...appData} />,
    [SetComponet.CREATE]: <TechManagementForm {...appData} />,
    [SetComponet.UPDATE]: <TechManagementForm {...appData} />,
  };

  return !techs.length ? (
    <LoadingPage />
  ) : (
    <>
      <Technology xs={12}>
        <Col xs={12} style={{ margin: '15px 0' }}>
          <Col>
            <h3>New tech: </h3>
          </Col>
          <Container>
            <Row>
              <Col xs={12} className="modalgrid">
                <button className="add-icon" onClick={handleCreate}>
                  <AiFillPlusCircle />
                  <p>add new tech</p>
                </button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12}>
          <Col>
            <h3>Existing techs</h3>
          </Col>
          <Col xs={12}>
            <Table projects>
              {techs
                .sort(sortByCreatedAt)
                .slice(0, 4)
                .map((techs) => (
                  <>
                    <TableItems
                      {...techs}
                      handleDeleteProject={handleDelete}
                      handleEditProject={handleUpdate}
                    />
                  </>
                ))}
            </Table>
          </Col>

          <Col xs={12} className="modalgrid">
            <button className="add-plus" onClick={handleGet}>
              <AiOutlinePlusCircle />
            </button>
          </Col>
        </Col>
      </Technology>

      <Modal isShown={isShown} hide={toggle}>
        {currentComponent[appData.selectedComponent]}
      </Modal>
    </>
  );
};

export default Techs;
