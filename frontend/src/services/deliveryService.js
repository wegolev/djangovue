const deliveryOptions = [
    {
      id: 1,
      transport_type: 'truck',
      name: 'Грузовик (до 5 тонн)',
      cost: 1500,
      description: 'Доставка стандартным грузовиком',
      constraints: { max_weight: 5000 } // кг
    },
    {
      id: 2,
      transport_type: 'dump_truck',
      name: 'Самосвал (до 10 тонн)',
      cost: 2500,
      description: 'Доставка самосвалом',
      constraints: { max_weight: 10000 }
    },
    {
      id: 3,
      transport_type: 'loader',
      name: 'Погрузчик + манипулятор',
      cost: 3500,
      description: 'Доставка с разгрузочной техникой',
      constraints: { max_weight: 7000 }
    }
  ]
  
  export default {
    getDeliveryOptions() {
      return new Promise((resolve) => {
        // Имитация API-запроса
        setTimeout(() => resolve(deliveryOptions), 300)
      })
    },
    
    validateDelivery(optionId, totalWeight) {
      const option = deliveryOptions.find(opt => opt.id === optionId)
      return option && totalWeight <= option.constraints.max_weight
    }
  }