import React, { useState, useContext } from 'react';
import { faMask, faUserHeadset, faCommentAltCheck } from '@fortawesome/pro-light-svg-icons';
// import VisuallyHidden from '@reach/visually-hidden';
// import { isNullOrUndefined } from 'util';
import styled, { ThemeContext } from 'styled-components/native';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import '@reach/dialog/styles.css';
// import { Event } from 'src/util/gaTracking';
import { Button, ButtonLink } from '../button/button';
import { fontSize, borderRadius, breakpoints } from '@osu-wams/theme';
import { Icon } from '../icon/icon';
import { Url } from '@osu-wams/utils';
// import Masquerade from 'src/features/Masquerade';
import { State, User, useAppVersions } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { SimpleExternalLink } from '../link/link';
import { Text } from '../text/text';
import { spacing } from '../../theme';
import { View } from 'react-native';

const { GROUPS } = User;

const FooterWrapper = styled.View(({ theme }) => ({
  backgroundColor: theme.footer.background,
  padding: 16,
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
}));

/*
  background-color: ${({ theme }) => theme.footer.background};
  padding: 16px 16px 6px;
  color: ${({ theme }) => theme.footer.color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  a {
    color: ${({ theme }) => theme.footer.link.color};
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
  */

const FooterContent = styled.View({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const FooterContentRow = styled.View<{ marginBottom?: number }>(
  ({ marginBottom = spacing.default }) => ({
    flexDirection: 'row',
    marginBottom,
  }),
);

const FooterIconLink = styled(ButtonLink)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.footer.iconLink.border,
  borderRadius: borderRadius[8],
  flexDirection: 'column-reverse',
  margin: 10,
  maxWidth: 130,
  padding: 8,
}));

const FooterText = styled(Text)(({ theme }) => ({
  color: theme.footer.color,
}));

const FooterLink = styled(SimpleExternalLink)(({ theme }) => ({
  color: theme.footer.color,
}));

const FooterDeployedContent = styled.View`
  /* display: block; */
  color: ${({ theme }) => theme.footer.adminText.color};
`;

const Footer = () => {
  const user = useRecoilValue(State.userState);
  // const { healthCheck, appVersion } = useAppVersions();
  const { healthCheck, appVersion } = { healthCheck: undefined, appVersion: undefined };
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const themeContext = useContext(ThemeContext);
  const toggleMasqueradeDialog = () => setShowMasqueradeDialog(!showMasqueradeDialog);

  /**
   * Generate a version link, if possible, for the deployed version
   * @param versionString the original version string
   * @param repository the github repository name
   */
  const versionLink = (repository: string, versionString?: string): JSX.Element => {
    if (versionString) {
      const [dateTime, version] = versionString.split('-'); // eslint-disable-line
      if (!version) {
        return <Text>{versionString}</Text>;
      } else {
        return (
          <Text
          // href={`http://github.com/osu-wams/${repository}/commit/${version}`} target="blank"
          >
            {versionString}
          </Text>
        );
      }
    } else {
      return <Text>not-found</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FooterWrapper>
        <FooterContent>
          <FooterContentRow>
            <FooterIconLink
              text="Get Support"
              href={Url.support.main}
              icon={
                <Icon
                  containerStyle={{ marginBottom: 5 }}
                  icon={faUserHeadset}
                  color={themeContext.footer.iconLink.icon.color}
                  noFlex
                  size={32}
                />
              }
            />
            <FooterIconLink
              text="Give Feedback"
              href={Url.feedback.main}
              target="_blank"
              // onClick={() => Event('footer', 'Give Feedback link')}
              icon={
                <Icon
                  containerStyle={{ marginBottom: 5 }}
                  icon={faCommentAltCheck}
                  color={themeContext.footer.iconLink.icon.color}
                  noFlex
                  size={32}
                />
              }
            />
          </FooterContentRow>
          <FooterContentRow marginBottom={spacing.small}>
            <FooterLink
              textStyle={{ textDecorationLine: 'underline' }}
              text="Copyright"
              fg={themeContext.footer.color}
              padding={0}
              noFlex
              url="https://oregonstate.edu/copyright"
              // onClick={() => Event('footer', 'Copyright link')}
            />
            <FooterText>&copy; {new Date().getFullYear()} Oregon State University</FooterText>
          </FooterContentRow>
          <FooterContentRow marginBottom={0}>
            <FooterLink
              textStyle={{ textDecorationLine: 'underline' }}
              text="Disclaimer"
              fg={themeContext.footer.color}
              padding={0}
              noFlex
              url="https://oregonstate.edu/official-web-disclaimer"
              // onClick={() => Event('footer', 'Disclaimer link')}
            />
            <FooterText> | </FooterText>
            <FooterLink
              textStyle={{ textDecorationLine: 'underline' }}
              text="Accessibility Information"
              fg={themeContext.footer.color}
              padding={0}
              noFlex
              url="https://accessibility.oregonstate.edu"
              // onClick={() => Event('footer', 'Accessibility link')}
            />
          </FooterContentRow>
          {user?.data?.isAdmin && healthCheck && appVersion && (
            <>
              <FooterDeployedContent>
                Server Version: {versionLink('dx-server', healthCheck.data?.version)}
              </FooterDeployedContent>
              <FooterDeployedContent>
                Client Version: {versionLink('dx', appVersion.data)}
              </FooterDeployedContent>
            </>
          )}
        </FooterContent>
        {user?.data?.groups?.includes(GROUPS.masquerade) && (
          <Button
            data-testid="masquerade"
            onClick={() => {
              toggleMasqueradeDialog();
              // Event('footer', 'masquerade', 'click masquerade modal open');
            }}
            bg={themeContext.footer.masquerade.background}
          >
            <Icon icon={faMask} color={themeContext.footer.masquerade.color} />
          </Button>
        )}
        {/* <ToastContainer /> */}
      </FooterWrapper>
      {/* user?.data?.groups?.includes(GROUPS.masquerade) && showMasqueradeDialog && (
        <Masquerade
          showMasqueradeDialog={showMasqueradeDialog}
          toggleMasqueradeDialog={toggleMasqueradeDialog}
        />
      ) */}
    </View>
  );
};

export default Footer;
