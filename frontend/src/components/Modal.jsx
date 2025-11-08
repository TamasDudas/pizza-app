import React from 'react';

export default function Modal({
	title,
	text,
	firstBtnText,
	scndBtnText,
	frstOnClick,
	scndOnClick,
}) {
	return (
		<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
					</div>
					<div className="modal-body">{text}.</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={frstOnClick}>
							{firstBtnText}
						</button>
						<button type="button" className="btn btn-primary" onClick={scndOnClick}>
							{scndBtnText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
