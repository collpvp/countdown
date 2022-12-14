const accordion = (headId, target, command, text) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={headId}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={'#' + target}
          aria-expanded="true"
          aria-controls={target}
        >
          {command}
        </button>
      </h2>
      <div
        id={target}
        className="accordion-collapse collapse"
        aria-labelledby={headId}
        data-bs-parent="#accordion"
      >
        <div
          className="accordion-body"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </div>
    </div>
  );
};

export default accordion;
