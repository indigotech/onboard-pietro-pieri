import styled from "styled-components/native";

export const InputWrapper = styled.View`
  margin-top: 30px;
  align-items: center;
`;

export const InputText = styled.Text`
  font-size: 12px;
  font-weight: regular;
  color: #777777;
  margin-bottom: 12px;
  width: 80%;
`;

export const InputField = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #777777;
  height: 44px;
  padding-horizontal: 10px;
  width: 80%;
  border-radius: 10px;
`;

export const CaptionText = styled.Text`
  font-size: 12px;
  font-weight: regular;
  color: red;
  margin-top: 8px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  height: 44px;
  background-color: #9403fc;
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  ${(props) => props.loading && "background-color: yellow;"}
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-weight: regular;
  color: white;
  font-size: 16px;
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
`;

export const RoleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RoleText = styled.Text`
  margin-left: 8px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 40px;
`;

export const HeaderContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-horizontal: 24px;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: black;
`;
