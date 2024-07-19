import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const CustomerFaqs = () => {
    const [activeTab, setActiveTab] = useState(1)

    const changeTab = (number) => {
        if (number === activeTab) {
            setActiveTab(0)
        } else {
            setActiveTab(number)
        }
    }

    return (
        <>
            <div className="seller-new-transaction">
                <div className="title">Faqs</div>
                <div className="h-a-s">
                    <div className="h-a-s-f-a-q">
                        <ul>
                            <li onClick={() => { changeTab(1) }}>
                                <div className="h-a-s-f-a-q-w">
                                    <div className="h-a-s-f-a-q-q" style={{paddingBottom : activeTab === 1 ? '2px' : '0px'}}>
                                        <div>
                                            Question # 1
                                            {activeTab === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </div>
                                    </div>
                                    {activeTab === 1 &&
                                        <div className="h-a-s-f-a-q-a">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    }
                                </div>
                            </li>
                            <li onClick={() => { changeTab(2) }}>
                                <div className="h-a-s-f-a-q-w">
                                    <div className="h-a-s-f-a-q-q" style={{paddingBottom : activeTab === 2 ? '2px' : '0px'}}>
                                        <div>
                                            Question # 2
                                            {activeTab === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </div>
                                    </div>
                                    {activeTab === 2 &&
                                        <div className="h-a-s-f-a-q-a">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    }
                                </div>
                            </li>
                            <li onClick={() => { changeTab(3) }}>
                                <div className="h-a-s-f-a-q-w">
                                    <div className="h-a-s-f-a-q-q" style={{paddingBottom : activeTab === 3 ? '2px' : '0px'}}>
                                        <div>
                                            Question # 3
                                            {activeTab === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </div>
                                    </div>
                                    {activeTab === 3 &&
                                        <div className="h-a-s-f-a-q-a">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    }
                                </div>
                            </li>
                            <li onClick={() => { changeTab(4) }}>
                                <div className="h-a-s-f-a-q-w">
                                    <div className="h-a-s-f-a-q-q" style={{paddingBottom : activeTab === 4 ? '2px' : '0px'}}>
                                        <div>
                                            Question # 4
                                            {activeTab === 4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </div>
                                    </div>
                                    {activeTab === 4 &&
                                        <div className="h-a-s-f-a-q-a">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </div>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* {isLoading ?
                                <LoadingComponents />
                                : */}
                    {/* } */}
                </div>
            </div>
        </>
    );
};

export default CustomerFaqs;
