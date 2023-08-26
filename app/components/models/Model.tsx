"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}
const Model: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disable,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModel, setShowmodel] = useState(isOpen);
  useEffect(() => {
    setShowmodel(isOpen);
  }, [isOpen]);
  const handelClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowmodel(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disable, onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) {
      return;
    }
    onSubmit(); 
  }, [disable, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disable && !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disable, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="justify-center flex items-center fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full lg-:w-3/6 xl:w-2/5 mx-auto md:w-4/6 h-full lg:h-auto">
          <div
            className={`translate duration-300 h-full
             ${showModel ? "translate-y-0" : "translate-y-full"}
             ${showModel ? "opacity-100" : "opacity-0"}
             `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 shadow-lg relative flex rounded-lg flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-center justify-center p-6 border-b-[1px] relative rounded-t">
                <button
                  onClick={handelClose}
                  className="
                p-1 border-0 hover:opacity:70 absolute  transition left-9 
                "
                >
                  <IoMdClose size={20} />
                </button>
                <div className="tex-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <div className="realtive flex-auto p-6">
                {body}
              </div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-col items-center gap-4 w-full">
                  {secondaryAction && secondaryLabel &&(
                    <Button
                    outline
                    disabled={disable}
                    label={secondaryLabel}
                    onClick={handleSecondaryAction}
                    />
                    )}
                  <Button
                  disabled={disable}
                  label={actionLabel}
                   onClick={handleSubmit}
                   />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
