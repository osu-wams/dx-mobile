import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { borderRadius } from '@osu-wams/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalBase = styled(Modal)(({ theme }) => ({
  background: theme.ui.myDialog.background,
  borderRadius: borderRadius[16],
  border: theme.ui.myDialog.border,
}));

const ModalView = styled(SafeAreaView)<{ hasPadding?: string }>(({ hasPadding }) => ({
  padding: 16,
  paddingBottom: hasPadding === 'false' ? 20 : 0,
}));

const Dialog = ({ children, padding = 'true', ...props }) => (
  <ModalBase {...props}>
    <ModalView hasPadding={padding}>{children}</ModalView>
  </ModalBase>
);
/*
  .closeButton {
    float: right;
    margin-right: -1.5rem;
    font-size: ${fontSize[26]};
  }
  h2 {
    color: ${({ color, theme }) => color || theme.ui.myDialog.h2.color};
    font-size: ${fontSize[24]};
    font-weight: 500;
    margin-bottom: 0;
    margin-top: ${spacing.small};
  }
  h3 {
    font-size: ${fontSize[16]};
    color: ${({ theme }) => theme.ui.myDialog.h3.color};
    margin-bottom: ${spacing.small};
  }
  .details {
    color: ${({ theme }) => theme.ui.myDialog.details.color};
    font-size: ${fontSize[14]};
    margin-top: -1rem;
    margin-bottom: 2rem;
  }
  &[data-reach-dialog-content] {
    ${(props) => (props.padding === 'false' ? 'padding: 0 0 1.5rem 0;' : '')}
  }
  @media screen and (max-width: ${breakpoints.small}) {
    hr {
      margin: 0;
    }
    &[data-reach-dialog-content] {
      width: 100%;
      margin: 0;
      ${(props) => (props.padding === 'false' ? 'padding: 0 0 1.5rem 0;' : '')}
      border-radius: 0;
    }
  }
  @media (min-width: ${breakpoints.small}) {
    &[data-reach-dialog-content] {
      width: 60vw;
      max-width: ${breakpoints.small};
    }
  }
`;
*/

const DialogFooter = styled.View({
  margin: '2 1 0',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const DialogImage = styled.Image({
  flex: 1,
  maxWidth: '100%',
  minWidth: '100%',
  borderRadius: `${borderRadius[16]} ${borderRadius[16]} 0 0`,
});

const DialogContent = styled.View<{ column?: boolean }>(({ column }) => ({
  display: 'flex',
  flexDirection: column ? 'column' : 'initial',
  padding: 2,
}));

const DialogHeader = styled.View(({ theme }) => ({
  padding: '1 2',
  borderBottom: `1px solid ${theme.ui.myDialog.header.border}`,
  /*
  > div {
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
  }
  */
  paddingTop: 0,
}));

export { DialogHeader, DialogContent, DialogFooter, DialogImage };
export default Dialog;
