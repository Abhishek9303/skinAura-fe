"use client"
import React, { useState } from 'react'
import DateTimePickerModal from '../../app/components/datePickerModel/DateTimePickerModal'

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // Temporarily set to true

    const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <DateTimePickerModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Page