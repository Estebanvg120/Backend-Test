import { HttpStatus } from '@nestjs/common';
import { CreatedeliveryService } from './createdelivery.service';
import { DeliveryrepositoryService } from '../../../domain/respository/deliveryrepository/deliveryrepository.service';

describe('CreatedeliveryService', () => {
  let createdeliveryService: CreatedeliveryService;
  let deliveryRepositoryService: DeliveryrepositoryService;

  const dataDelivery = {
    department: "string",
    city: "string",
    complement: "string",
    name: "string",
    lastname: "string",
    documentType: "string",
    documentNumber: "string",
    phone: "string",
    email: "string",
    address: "string",
    transaction: {
      id: 2,
      amount: 150000,
      description: "description ejemplo",
      installments: 2,
      token: "tok_stagtest_5113_43E94d0d3ac16CbfFd14fe4fA134f6cd",
      external_id: "15113-1721238962-71945",
      quantityProduct: 2,
      product: {
        id: 3,
        name: "Jordan Spizike Low",
        description: "Zapatillas para Hombre",
        price: 500000.00,
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ed91bc9c-6b54-4153-9c45-c18f11f92196/jordan-spizike-low-zapatillas-vq21MN.png",
        stock: 25,
        createAt: "2024-07-16T14:23:16.639Z",
        updatedAt: "2024-07-16T14:23:16.639Z",
      },
      customer: {
        id: 1,
        name: "Esteban",
        lastname: "Vargas Garcia",
        documentType: "CC",
        documentNumber: "112232432",
        phone: "+57302245187",
        email: "esteban@gmail.com",
        createAt: "2024-07-16T21:47:37.502Z",
        updatedAt: "2024-07-16T21:47:37.502Z"
      }
    }
  }
  beforeEach(() => {
    // Crear un mock del servicio de repositorio
    deliveryRepositoryService = {
      async createDeliveryRepository(dataDelivery) {
        // Simular diferentes escenarios de prueba según los datos de entrada
        if (dataDelivery.customerId === 'validCustomer') {
          return { id: 'mockedId', status: 'success' }; // Simular una respuesta exitosa
        } else {
          throw new Error('Error simulado'); // Simular un error
        }
      }
    } as any;

    createdeliveryService = new CreatedeliveryService(deliveryRepositoryService);
  });

  describe('createDelivery', () => {
    it('debería devolver HttpStatus.OK y datos cuando se crea correctamente', async () => {
      // Arrange

      // Act
      const result = await createdeliveryService.createDelivery(dataDelivery);

      // Assert
      expect(result.status).toEqual(HttpStatus.OK);
      expect(result.message).toEqual('Transaction could not be created');
      expect(result.data).toEqual({ id: 'mockedId', status: 'success' });
    });

    it('debería devolver HttpStatus.BAD_REQUEST y mensaje de error cuando falla la creación', async () => {
      // Arrange


      // Act
      const result = await createdeliveryService.createDelivery(dataDelivery);

      // Assert
      expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(result.message).toEqual('Error simulado');
    });

    // Puedes agregar más casos de prueba para cubrir otros escenarios según sea necesario.
  });
});
