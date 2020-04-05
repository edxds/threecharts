import React from 'react';
import styled from 'styled-components';
import { Modal, Backdrop } from '@material-ui/core';
import { Transition } from 'react-transition-group';

const ModalContentContainer = styled.div<{ state: string; translateY: number }>`
  outline: 0;

  overflow: auto;
  border-radius: 16px 16px 0 0;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: stretch;

  transition: all 500ms cubic-bezier(0.5, 0.5, 0.25, 1);
  transform: translateY(${(p) => (p.state === 'entered' ? 0 : p.translateY)}px);

  & > * {
    flex: 1;
  }
`;

export const FullscreenModal: React.FC<{ open: boolean }> = ({ children, ...rest }) => {
  const windowHeight = window.innerHeight;
  const translateY = windowHeight;

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      closeAfterTransition
      {...rest}
    >
      <Transition appear in={rest.open} timeout={{ enter: 0, exit: 500 }}>
        {(state) => (
          <ModalContentContainer state={state} translateY={translateY}>
            {children}
          </ModalContentContainer>
        )}
      </Transition>
    </Modal>
  );
};
