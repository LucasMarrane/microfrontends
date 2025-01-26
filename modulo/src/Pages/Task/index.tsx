import { useState } from "react";
import { useTaskHook } from "../../hooks/useTaskStore";
import { Button, Col, Row, Table } from "reactstrap";
import { ITask } from "@template/uteis";
import { ModalTask } from "./Components/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

export function Task() {
  const { tasks, removeTask } = useTaskHook();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask>(null);

  const _listTask = Array.from(tasks?.values());

  return (
    <>
      <h1>Tasks</h1>
      <Row className="p-2">
        <Col sm={2} className="offset-10 d-flex justify-content-end">
          <Button onClick={() => setOpenModal(true)}>Add</Button>
        </Col>
      </Row>
      {_listTask.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Key</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {_listTask.map((item, _idx) => (
                <tr
                key={`${item.key}-${_idx}`}
                  className={
                    item.status == "done"
                      ? "table-success"
                      : item.status == "in progress"
                      ? "table-primary"
                      : ""
                  }
                >
                  <td>
                    <FaTrash
                      className="text-danger"
                      onClick={() => removeTask(item.key)}
                    />{" "}
                    <FaEdit
                      className="text-secondary"
                      onClick={() => {
                        setSelectedTask(item);
                        setOpenModal(true);
                      }}
                    />
                  </td>
                  <td>{item.key}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <ModalTask
        open={openModal}
        task={selectedTask}
        setOpen={() => {
          setOpenModal(false);
          setSelectedTask(null);
        }}
      />
    </>
  );
}
