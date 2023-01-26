import classes from "./styles.module.scss";

type ModalWindowProps = {
  children: any;
  visible: boolean;
};
const ModalWindow = ({ children, visible }: ModalWindowProps) => {
  const rootClasses = [classes.appModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(" ")}>
      <div
        className={classes.appModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
