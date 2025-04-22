import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICourseValue, ILessonValue } from "../interfaces/Course";

interface AdminContextType {
  selectedCourse: ICourseValue | null;
  setSelectedCourse: (course: ICourseValue | null) => void;
  selectedLesson: ILessonValue | null;
  setSelectedLesson: (lesson: ILessonValue | null) => void;
  isLessonDialogOpen: boolean;
  openLessonDialog: () => void;
  closeLessonDialog: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseValue | null>(
    null
  );
  const [selectedLesson, setSelectedLesson] = useState<ILessonValue | null>(
    null
  );
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);

  const openLessonDialog = () => setIsLessonDialogOpen(true);
  const closeLessonDialog = () => setIsLessonDialogOpen(false);

  return (
    <AdminContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedLesson,
        setSelectedLesson,
        isLessonDialogOpen,
        openLessonDialog,
        closeLessonDialog,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
