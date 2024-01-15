import React from "react";
import { Modalize } from "react-native-modalize";
import { View } from "react-native";
import { UserForm } from "./user-form";

interface ModalizeComponentProps {
  modalRef: React.MutableRefObject<Modalize | null>;
  closeModal: () => void;
}

export const ModalizeComponent: React.FC<ModalizeComponentProps> = ({
  modalRef,
  closeModal,
}) => {
  return (
    <View>
      <Modalize
        ref={modalRef}
        modalHeight={500}
        snapPoint={300}
        closeSnapPointStraightEnabled={false}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        onOverlayPress={closeModal}
      >
        <UserForm closeModal={closeModal}></UserForm>
      </Modalize>
    </View>
  );
};
