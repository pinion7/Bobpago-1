import React, { Dispatch, SetStateAction, useState } from "react";
import Profile from "components/Profile/FollowList/Profile";
import {
  FollowContainer,
  Title,
  ProfileImgContainer,
  ProfileContainer,
  ProfileTextContainer,
  NameContainer,
  dummy,
  ViewAllContainer,
  XIcon,
} from "./styles";

interface ListProps {
  follow?: any;
}

const FollowList: React.FC<ListProps> = ({ follow }) => {
  return (
    <ProfileContainer>
      <ProfileImgContainer>
        <Profile
          size={5.7}
          src={
            follow.imageUrl &&
            `${process.env.REACT_APP_S3_IMG_URL}/${follow.imageUrl}`
          }
        />
      </ProfileImgContainer>
      <ProfileTextContainer>
        <NameContainer>{follow.nickname}</NameContainer>
      </ProfileTextContainer>
    </ProfileContainer>
  );
};

interface Props {
  setFollowingModal: Dispatch<SetStateAction<boolean>>;
  follow?: any;
}

const FollowingModal = ({ setFollowingModal, follow }: Props) => {
  const [view, setView] = useState<number>(4);
  return (
    <FollowContainer>
      <Title>Following</Title>
      <XIcon onClick={() => setFollowingModal(false)} />
      {follow.slice(0, view).map((el: any, i: number) => {
        return <FollowList key={i} follow={follow[i]} />;
      })}
      {follow.length <= 3 || view === follow.length ? null : (
        <ViewAllContainer onClick={() => setView(follow.length)}>
          VIEW ALL
        </ViewAllContainer>
      )}
    </FollowContainer>
  );
};

export default FollowingModal;