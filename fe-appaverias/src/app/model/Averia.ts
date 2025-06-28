export interface Averia{
  idAveria: number;
  motivo: string;
  descripcion: string;
  idAsesor: number;
  idCliente: number;
  idProducto: number;
  nombContacto: string;
  telefContacto: string;
  esDerivado: number;
  // Datos del Cliente
  tipoDoc: string;
  numDoc: string;
  nombres: string;
  apellPaterno: string;
  apellMaterno: string;
  telefono: string;
  direccion: string;
  correo: string;

}
