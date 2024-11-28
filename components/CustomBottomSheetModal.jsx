import { Pressable, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import HabitInfo from "./HabitInfo";
import AddHabit from "./AddHabit";
import Dialog from "react-native-dialog";
import { useAuth } from "@clerk/clerk-expo";
import axiosInstance from "../api";

// eslint-disable-next-line react/display-name
const CustomBottomSheetModal = forwardRef(({ curHabit, setReload }, ref) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { dismiss } = useBottomSheetModal();
  const { getToken } = useAuth();

  const snapPoints = useMemo(() => ["25%", "40%", "75%"], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    // eslint-disable-next-line prettier/prettier
    []
  );
  const handleSnapToIndex = useCallback(
    (index) => {
      ref.current?.snapToIndex(3);
    },
    // eslint-disable-next-line prettier/prettier
    [ref]
  );

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setShowInfo(false);
      setShowEdit(false);
    }
  }, []);

  function handleBtnPress(setter) {
    handleSnapToIndex();
    setter(true);
  }
  function handleDeletePress(setter) {
    dismiss();
    setter(true);
  }

  const deleteHabit = async () => {
    try {
      const token = await getToken();

      const response = await axiosInstance.delete(`/habit/${curHabit.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setReload((cur) => !cur);
        return;
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>Delete Habit</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this habit? You cannot undo this
          action.
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setDialogOpen(false);
          }}
        />
        <Dialog.Button
          label="Delete"
          onPress={async () => {
            await deleteHabit();
            setDialogOpen(false);
          }}
        />
      </Dialog.Container>
      <BottomSheetModal
        ref={ref}
        index={2}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#A2B2EE" }}
        handleIndicatorStyle={{ backgroundColor: "#2E3239" }}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
      >
        <BottomSheetView className="flex-1 bg-secondary-light p-5 gap-6">
          {!showInfo && !showEdit && (
            <>
              <Pressable onPress={() => handleBtnPress(setShowInfo)}>
                <BottomSheetView className="flex-row items-center gap-4">
                  <AntDesign name="infocirlce" size={30} color="#26292B" />
                  <Text className="text-primary-dark text-lg font-psemibold">
                    Habit info
                  </Text>
                </BottomSheetView>
              </Pressable>
              <Pressable onPress={() => handleBtnPress(setShowEdit)}>
                <BottomSheetView className="flex-row items-center gap-4">
                  <AntDesign name="edit" size={30} color="#26292B" />
                  <Text className="text-primary-dark text-lg font-psemibold">
                    Edit habit
                  </Text>
                </BottomSheetView>
              </Pressable>
              <Pressable onPress={() => handleDeletePress(setDialogOpen)}>
                <BottomSheetView className="flex-row items-center gap-4">
                  <AntDesign name="delete" size={30} color="#26292B" />
                  <Text className="text-primary-dark text-lg font-psemibold">
                    Delete habit
                  </Text>
                </BottomSheetView>
              </Pressable>
            </>
          )}
          {showInfo && <HabitInfo habit={curHabit} />}
          {showEdit && <AddHabit habit={curHabit} setReload={setReload} />}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
});

export default CustomBottomSheetModal;
