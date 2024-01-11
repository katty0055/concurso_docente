//variables globales
import { create } from 'zustand';

//hook para gestionar datos de usuario
export const useUserData = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));

//Hook para gestionar datos de concurso
export const useConcursoData = create((set) => ({
  concursoData: null, 
  setConcursoData: (data) => set({ concursoData: data }),
  clearConcursoData: () => set({ concursoData: null })
}));


//Nombre del servidor 
export const useServerStore = create(() => ({
  localhost: 'desarrollodtic.pol.una.py',
}));





