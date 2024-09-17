import React, {MouseEventHandler} from 'react';
import ReactPlayer from 'react-player';

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: MouseEventHandler;
  track: string | null;
}

const Modal: React.FC<Props> = ({show, onClose, track}) => {
  return (
    <>
      <div className='modal-backdrop show' style={{display: show ? 'block' : 'none'}}/>
      <div className='modal show' style={{ display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className='modal-dialog h-75' style={{maxWidth: "70%"}} onClick={(event) => event.stopPropagation()}>
          <div className='modal-content h-100'>
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={onClose} ></button>
            </div>
            <div className="modal-body">
              {track && (
                <ReactPlayer
                  url={track}
                  playing={true}
                  controls={true}
                  width='100%'
                  height='100%'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;