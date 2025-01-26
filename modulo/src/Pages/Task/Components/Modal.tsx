import { ITask } from "@template/uteis";
import { useForm } from "react-hook-form";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useTaskHook } from "../../../hooks/useTaskStore";

type ModalTaskProps = {
  task?: ITask;
  open: boolean;
  setOpen: Function;
};

const schema = Yup.object({
  task: Yup.object({
    key: Yup.string().required("Key is required"),
    description: Yup.string().max(
      50,
      "Description must have contains at least 100 chars"
    ),
    status: Yup.string().default("new"),
  }),
});
export function ModalTask(props: ModalTaskProps) {
  const { addTask } = useTaskHook();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "all",
    reValidateMode: "onBlur",
  });

  function close() {
    reset();
    props.setOpen();
  }

  const submit = handleSubmit((form) => {
    addTask(form?.task as ITask);
    close();
  });

  useEffect(() => {
    if (props.open) {
      setValue("task", props?.task);
      console.log(props);
    }
  }, [props.open]);
  return (
    <Modal isOpen={props.open} toggle={close} size="lg">
      <ModalHeader toggle={props.setOpen as any}>Task</ModalHeader>
      <ModalBody>
        <form>
          <Row>
            <Col sm={12}>
              <Label>Key (if already exists will be updated)</Label>
              <input
              disabled={!!props?.task?.key}
              className="form-control"
                {...register("task.key")}               
              />
              {errors?.task?.key?.message && (
                <span className="text-danger">
                  {errors?.task?.key?.message}
                </span>
              )}
            </Col>
            <Col sm={12}>
              <Label>Description</Label>
              <textarea
              className="form-control"
                {...register("task.description")}
               
              />
              {errors?.task?.description?.message && (
                <span className="text-danger">
                  {errors?.task?.description?.message}
                </span>
              )}
            </Col>
            <Col sm={12}>
              <Label>Status</Label>
              <select className="form-control" {...register("task.status")}>
                <option value="new">New</option>
                <option value="in progress">In progress</option>
                <option value="done">Done</option>
              </select>
              {errors?.task?.status?.message && (
                <span className="text-danger">
                  {errors?.task?.status?.message}
                </span>
              )}
            </Col>
          </Row>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={close}>
          Cancel
        </Button>
        <Button color="success" onClick={submit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
