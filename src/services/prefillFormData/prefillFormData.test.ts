import { prefillFormData } from './prefillFormData'; // Replace with the actual file path

describe('prefillFormData', () => {
  it('should call setValue with correct arguments for basic fields', () => {
    const mockSetValue = jest.fn(); 

    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    prefillFormData(mockSetValue, data);

    expect(mockSetValue).toHaveBeenCalledTimes(Object.keys(data).length);
    expect(mockSetValue).toHaveBeenNthCalledWith(1, 'name', 'John Doe');
    expect(mockSetValue).toHaveBeenNthCalledWith(2, 'email', 'john.doe@example.com');
    expect(mockSetValue).toHaveBeenNthCalledWith(3, 'age', 30);
  });

  it('should handle nested fields correctly', () => {
    const mockSetValue = jest.fn(); 

    const data = {
      address: {
        street: '123 Main St',
        city: 'Anytown',
      },
    };

    prefillFormData(mockSetValue, data);

    expect(mockSetValue).toHaveBeenCalledWith("address", {"city": "Anytown", "street": "123 Main St"});
  });

  it('should handle arrays of objects correctly', () => {
    const mockSetValue = jest.fn(); 

    const data = {
      props: [{ name: 'test', value: 'test' }, { name: 'test2', value: 'test2' }],
    };

    prefillFormData(mockSetValue, data);

    expect(mockSetValue).toHaveBeenCalledWith('props', [{ name: 'test', value: 'test' }, { name: 'test2', value: 'test2' }]); 
  });

  it('should handle empty data', () => {
    const mockSetValue = jest.fn(); 

    const data = {};

    prefillFormData(mockSetValue, data);

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});