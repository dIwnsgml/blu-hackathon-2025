"use client";

import styles from "./AccountModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useEffect, useState } from "react";

export default function AccountModal() {

  return (
    <div className={styles.AddSubjectModal}>
      <DraggableModal
        isOpen={isAddSubjectModal}
        setIsOpen={setIsAddSubjectModal}
        top="15rem"
      >
        <div className={styles.inner}>
          <div className={styles.inputWrapper} data-tutorial={4}>
            <CustomInput
              input={subject.name}
              handleInput={(e) =>
                setSubject((prev) => ({ ...prev, name: e.target.value }))
              }
              placeHolder={"Subject Name"}
              type={"text"}
            >
              <FontAwesomeIcon icon={faBook} />
            </CustomInput>
          </div>
          <ColorPalette
            setSelectedColor={(color) => {
              setSubject((prev) => ({ ...prev, color }));
            }}
            selectedColor={subject.color}
            isSelectColor={isSelectColor}
            setIsSelectColor={setIsSelectColor}
            tutorial={5}
          />
          <div className={styles.submit} data-tutorial={6}>
            <BlobBtn
              onClick={() => {
                onSubmit(subject);
              }}
            >
              SAVE
            </BlobBtn>
          </div>
        </div>
      </DraggableModal>
    </div>
  );
}
