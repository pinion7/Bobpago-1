import React, { useState, useEffect } from "react";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import MyPageEditProfileImg from "components/Profile/MyPage/MyPageEditProfileImg";
import Card from "components/Card/MyPage/Card";
import BookmarkCard from "components/Card/MyPage/BookmarkCard";
import FollowingModal from "components/FollowModal/FollowingModal";
import FollowerModal from "components/FollowModal/FollowerModal";
import CheckExpired from "utils/CheckExpired";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/Loading/Loading";
import { removeAccessToken, reissueAccessToken } from "actions/Accesstoken";
import { useHistory } from "react-router";
import axios, { AxiosError } from "axios";
import { RootState } from "reducers";
import {
  PageContainer,
  UserProfileContainer,
  ProfileImgContainer,
  ProfileContentsContainer,
  ProfileName,
  ProfileIntroduce,
  ProfileRecommend,
  FollowContainer,
  FollowBtn,
  FollowNum,
  MyPostContainer,
  MyPostTitle,
  EditBtn,
  DivisionLine,
  GridContainer,
  PlusIcon,
  IconContainer,
  DotsIcon,
  MenuContainer,
  DropDownContainer,
  Menu1,
  Menu2,
  ModalBackground,
  MinusIcon,
  CheckPassword,
  CheckPasswordInput,
  CheckPasswordBtn,
  CheckPasswordText,
  CheckWithDrawContainer,
  BtnContainer,
  WithDrawBtn,
  EditInfoContainer,
  EditInfoImgContainer,
  InputContainer,
  InputTitle,
  EditInput,
  ModalBackground2,
  Container,
  NoPostContainer,
  NoPostText,
  CheckEditBtn,
} from "./styles";
import { E } from "styled-icons/simple-icons";
import {
  ModalBtn,
  ModalBtnNo,
  ModalContainer,
  ModalTitle,
} from "../EditRecipe/styles";

interface Post {
  amount: number;
  createdAt: string;
  estTime: number;
  id: number;
  level: number;
  thumbnail: string;
  title: string;
  updatedAt: string;
  userId: number;
  views: number;
}

interface EditInfo {
  password?: string | undefined;
  nickname?: string | undefined;
  profile?: string | undefined;
}

const MyPage = () => {
  const [passwordModalEdit, setPasswordModalEdit] = useState<boolean>(false);
  const [passwordModalWithDraw, setPasswordModalWithDraw] =
    useState<boolean>(false);
  const [myPostFix, setMyPostFix] = useState<boolean>(false);
  const [bookmarkFix, setBookmarkFix] = useState<boolean>(false);
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [bookmarkNum, setBookmarkNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [nickname, setNickname] = useState<string>("");
  const [followingNum, setFollowingNum] = useState<number>(0);
  const [followerNum, setFollowerNum] = useState<number>(0);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [editInfoModal, setEditInfoModal] = useState<boolean>(false);
  const [checkWithDrawModal, setCheckWithDrawModal] = useState<boolean>(false);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordWithDraw, setPasswordWithDraw] = useState<string>("");
  const [editNickName, setEditNickName] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");
  const [editIntroduce, setEditIntroduce] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string | null>("");
  const [myPostData, setMyPostData] = useState<any>([]);
  const [bookmarkData, setBookmarkData] = useState<any>([]);
  const [introduce, setIntroduce] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const [followeeInfo, setFolloweeInfo] = useState<any>([]);
  const [followerInfo, setFollowerInfo] = useState<any>([]);
  const [temporaryImg, setTemporaryImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>({
    id: null,
    index: null,
  });
  const { accessToken, tokenType, userId } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const history = useHistory();
  const dispatch = useDispatch();

  async function getData() {
    setLoading(true);
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        await dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      const data = response.data.data;
      setNickname(data.nickname);
      setIntroduce(data.profile);
      data.imageUrl &&
        setProfileImg(`${process.env.REACT_APP_S3_IMG_URL}${data.imageUrl}`);
      setBookmarkData(data.bookmarks);
      setMyPostData(data.recipes);
      setFollowingNum(data.followees);
      setFollowerNum(data.followers);
      setId(data.id);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
    }
  }

  useEffect(() => {
    getData();
    !accessToken && history.push("/");
  }, []);

  // ????????? ??? : ????????? ???????????? ????????? ?????? ?????? ????????????
  // useEffect(() => {
  //   window.innerWidth
  // }, [window.innerWidth])

  // ????????? ????????? ?????? ??????
  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

  // ???????????? ?????? ???????????? ??????
  const passwordCheckEdit = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/checkMyInfo?tokenType=${tokenType}`,
        {
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      setPasswordModalEdit(false);
      setEditInfoModal(true);
      setEditNickName(nickname);
      setEditIntroduce(introduce);
      setEditPassword(password);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        } else {
          alert("??????????????? ???????????????");
        }
      }
    }
  };

  // ???????????? ???????????? ??????
  const passwordCheckWithDraw = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/checkMyInfo?tokenType=${tokenType}`,
        {
          password: passwordWithDraw,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      if (data) {
        setPasswordModalWithDraw(false);
        setCheckWithDrawModal(true);
      } else {
        alert("??????????????? ???????????????");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        } else {
          alert("??????????????? ???????????????");
        }
      }
    }
  };

  // ???????????? ??????
  const handleChangeMyInfo = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      if (temporaryImg) {
        const formData = new FormData();
        formData.append("files", temporaryImg);
        const uploadImg = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/image/${id}/?tokenType=${tokenType}&path=user`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${newToken ? newToken : accessToken}`,
            },
          }
        );
        const url = uploadImg.data.data.imageUrl;
        setProfileImg(`${process.env.REACT_APP_S3_IMG_URL}${url}`);
      }
      const editedInfo: EditInfo = {};
      if (tokenType === "jwt") {
        if (editPassword !== password) editedInfo.password = editPassword;
        else editedInfo.password = password;
      }
      if (editNickName !== nickname) editedInfo.nickname = editNickName;
      else editedInfo.nickname = nickname;
      if (editIntroduce !== introduce) editedInfo.profile = editIntroduce;
      else editedInfo.profile = introduce;
      if (Object.keys(editedInfo).length !== 0) {
        const data = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
          editedInfo,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${newToken ? newToken : accessToken}`,
            },
          }
        );

        getData();
        setEditInfoModal(false);
      } else if (temporaryImg) {
        setEditInfoModal(false);
      } else {
        setEditInfoModal(false);
        alert("?????? ????????? ????????????");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
    }
  };

  // ????????????
  const handleWithDraw = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      history.push("/");
      dispatch(removeAccessToken());
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
      console.log(err);
    }
  };

  //????????? ?????? ??????
  const handleFollowingModalOn = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${id}/followee?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      setFolloweeInfo(data.data.data);
      setFollowingModal(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
    }
  };

  //????????? ?????? ??????
  const handleFollowerModalOn = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${id}/follower?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      setFollowerInfo(data.data.data);
      setFollowerModal(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
    }
  };

  // ??? ??? ??????
  const removeMyPost = async (i: number, id: number) => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const copiedData = myPostData.slice();
      copiedData.splice(i, 1);
      setMyPostData(copiedData);
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/recipe/${id}?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
      console.log(err);
    }
  };

  // ????????? ??????
  const removeBookmarkCheck = async (i: number, id: number) => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const copiedData = bookmarkData.slice();
      copiedData.splice(i, 1);
      setBookmarkData(copiedData);
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/${id}/bookmarks?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
    }
  };

  // ??????????????? jwt??? ???????????? ??????
  const handleOpenModalEdit = () => {
    if (tokenType === "jwt") setPasswordModalEdit(true);
    else {
      setEditInfoModal(true);
      setEditNickName(nickname);
      setEditIntroduce(introduce);
    }
  };

  // ??????????????? jwt??? ???????????? ??????
  const handleOpenModalWithDraw = () => {
    if (tokenType === "jwt") setPasswordModalWithDraw(true);
    else {
      setCheckWithDrawModal(true);
    }
  };
  useEffect(() => {
    if (!passwordModalEdit || !passwordModalWithDraw) {
      setPassword("");
      setPasswordWithDraw("");
    }
  }, [passwordModalEdit, passwordModalWithDraw]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav opac={true} />
          <Container>
            <PageContainer>
              <UserProfileContainer>
                <ProfileImgContainer>
                  <MyPageProfileImg
                    src={profileImg ? profileImg : undefined}
                    size={15}
                  />
                </ProfileImgContainer>
                <ProfileContentsContainer>
                  <ProfileName>{nickname}</ProfileName>
                  {introduce ? (
                    <ProfileIntroduce>{introduce}</ProfileIntroduce>
                  ) : (
                    <ProfileRecommend>
                      {nickname}?????? ????????? ????????? ???????????? ??????????????????????
                    </ProfileRecommend>
                  )}
                  <DropDownContainer>
                    <DotsIcon />
                    <MenuContainer className="menu">
                      <Menu1 onClick={() => handleOpenModalEdit()}>
                        ??????????????????
                      </Menu1>
                      <Menu2 onClick={() => handleOpenModalWithDraw()}>
                        ????????????
                      </Menu2>
                    </MenuContainer>
                  </DropDownContainer>
                </ProfileContentsContainer>
              </UserProfileContainer>
              <FollowContainer>
                <FollowBtn onClick={() => handleFollowingModalOn()}>
                  ?????????
                </FollowBtn>
                <FollowNum>{followingNum}</FollowNum>
                <FollowBtn onClick={() => handleFollowerModalOn()}>
                  ?????????
                </FollowBtn>
                <FollowNum>{followerNum}</FollowNum>
              </FollowContainer>
              <MyPostContainer>
                <MyPostTitle>?????? ?????????</MyPostTitle>
                <EditBtn
                  onClick={() =>
                    myPostFix ? setMyPostFix(false) : setMyPostFix(true)
                  }
                >
                  ??????
                </EditBtn>
                <DivisionLine />
                {myPostData.length !== 0 ? (
                  <>
                    <GridContainer>
                      {myPostData
                        .slice(0, myPostNum)
                        .map((el: any, i: number) => (
                          <Card
                            index={i}
                            key={i}
                            postData={el}
                            fix={myPostFix}
                            setDeleteRecipeModal={setDeleteRecipeModal}
                            setSelectedRecipe={setSelectedRecipe}
                          />
                        ))}
                    </GridContainer>
                    {deleteRecipeModal && (
                      <>
                        <ModalBackground2
                          onClick={() => setDeleteRecipeModal(false)}
                        />
                        <ModalContainer>
                          <ModalTitle>
                            ???????????? ?????? ?????????????????????????
                          </ModalTitle>
                          <ModalBtn
                            onClick={async () => {
                              await removeMyPost(
                                selectedRecipe.index,
                                selectedRecipe.id
                              ).then(() => setDeleteRecipeModal(false));
                            }}
                          >
                            ???
                          </ModalBtn>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <ModalBtnNo
                            onClick={() => setDeleteRecipeModal(false)}
                          >
                            ?????????
                          </ModalBtnNo>
                        </ModalContainer>
                      </>
                    )}
                    <IconContainer>
                      {myPostNum > standardNum &&
                        myPostData.length > standardNum && (
                          <MinusIcon
                            onClick={() =>
                              setMyPostNum(myPostNum - standardNum)
                            }
                          />
                        )}
                      {myPostData.length > myPostNum && (
                        <PlusIcon
                          onClick={() => setMyPostNum(myPostNum + standardNum)}
                        />
                      )}
                    </IconContainer>
                  </>
                ) : (
                  <NoPostContainer>
                    <NoPostText>?????? ???????????? ?????????!</NoPostText>
                  </NoPostContainer>
                )}
              </MyPostContainer>

              <MyPostContainer>
                <MyPostTitle>????????? ??????</MyPostTitle>
                <EditBtn
                  onClick={() =>
                    bookmarkFix ? setBookmarkFix(false) : setBookmarkFix(true)
                  }
                >
                  ??????
                </EditBtn>
                <DivisionLine />

                {bookmarkData.length !== 0 ? (
                  <>
                    <GridContainer>
                      {bookmarkData
                        .slice(0, bookmarkNum)
                        .map((el: any, i: number) => (
                          <BookmarkCard
                            removeBookmarkCheck={removeBookmarkCheck}
                            index={i}
                            key={i}
                            postData={el}
                            fix={bookmarkFix}
                          />
                        ))}
                    </GridContainer>
                    <IconContainer>
                      {bookmarkData &&
                        bookmarkNum > standardNum &&
                        bookmarkData.length > standardNum && (
                          <MinusIcon
                            onClick={() =>
                              setBookmarkNum(bookmarkNum - standardNum)
                            }
                          />
                        )}
                      {bookmarkData.length >= bookmarkNum && (
                        <PlusIcon
                          onClick={() =>
                            setBookmarkNum(bookmarkNum + standardNum)
                          }
                        />
                      )}
                    </IconContainer>
                  </>
                ) : (
                  <NoPostContainer>
                    <NoPostText>???????????? ?????? ????????? ????</NoPostText>
                  </NoPostContainer>
                )}
              </MyPostContainer>
            </PageContainer>
          </Container>
        </>
      )}

      {followingModal || followerModal ? (
        <ModalBackground onClick={() => ModalOff()} />
      ) : null}
      {followingModal && (
        <FollowingModal
          follow={followeeInfo}
          setFollowingModal={setFollowingModal}
        />
      )}
      {followerModal && (
        <FollowerModal
          follow={followerInfo}
          setFollowerModal={setFollowerModal}
        />
      )}
      {passwordModalEdit && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalEdit(false)} />
          <CheckPassword>
            <CheckPasswordText>???????????? ??????</CheckPasswordText>
            <CheckPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckEdit()}>
              ??????
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {passwordModalWithDraw && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalWithDraw(false)} />
          <CheckPassword>
            <CheckPasswordText>???????????? ??????</CheckPasswordText>
            <CheckPasswordInput
              value={passwordWithDraw}
              onChange={(e) => setPasswordWithDraw(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckWithDraw()}>
              ??????
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {checkWithDrawModal && (
        <>
          <ModalBackground2 onClick={() => setCheckWithDrawModal(false)} />
          <CheckWithDrawContainer>
            <CheckPasswordText>????????? ?????????????????????????</CheckPasswordText>
            <BtnContainer>
              <WithDrawBtn onClick={() => handleWithDraw()}>???</WithDrawBtn>
              <WithDrawBtn onClick={() => setCheckWithDrawModal(false)}>
                ?????????
              </WithDrawBtn>
            </BtnContainer>
          </CheckWithDrawContainer>
        </>
      )}
      {editInfoModal && (
        <>
          <ModalBackground2 onClick={() => setEditInfoModal(false)} />
          <EditInfoContainer>
            <CheckPasswordText>???????????? ??????</CheckPasswordText>
            <EditInfoImgContainer>
              <MyPageEditProfileImg
                userId={id}
                setTemporaryImg={setTemporaryImg}
                setProfileImg={setProfileImg}
                src={profileImg ? profileImg : undefined}
                size={12}
                fix={true}
              />
            </EditInfoImgContainer>
            <InputContainer>
              <InputTitle>?????????</InputTitle>
              <EditInput
                value={editNickName}
                onChange={(e) => setEditNickName(e.target.value)}
              />
            </InputContainer>
            {tokenType === "jwt" && (
              <InputContainer>
                <InputTitle>????????????</InputTitle>
                <EditInput
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </InputContainer>
            )}
            <InputContainer>
              <InputTitle>?????????</InputTitle>
              <EditInput
                value={editIntroduce}
                type="text-area"
                onChange={(e) => setEditIntroduce(e.target.value)}
              />
            </InputContainer>
            <CheckEditBtn onClick={() => handleChangeMyInfo()}>
              ??????
            </CheckEditBtn>
          </EditInfoContainer>
        </>
      )}
    </>
  );
};

export default MyPage;
