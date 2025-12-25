import { useEffect } from "react";

function CloseIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modalHandle" aria-hidden="true" />

        <div className="modalHeader">
          <button className="iconButton" type="button" onClick={onClose} aria-label="بستن">
            <CloseIcon />
          </button>
          <h2 className="modalTitle">{title}</h2>
          <span className="modalHeaderSpacer" aria-hidden="true" />
        </div>

        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
