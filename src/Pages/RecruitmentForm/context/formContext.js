import { createContext, useState } from "react";
import Controller from "../components/Controller";
import InputField from "../Form_input_fileds/InputField";
import DropDown from "../Form_input_fileds/DropDown";
import TextArea from "../Form_input_fileds/TextArea";
import RadioButton from "../Form_input_fileds/RadioButton";
import SpecialRange from "../Form_input_fileds/SpecialRange";
import LimitedCheckBox from "../Form_input_fileds/LimitedCheckBox";

const FormDataContext = createContext({});

export const FormDataProvider = ({ children }) => {
    let [step, setStep] = useState(3);
    let [data, setData] = useState({
        // first step
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        gpa: "",
        semester: "",
        faculty: "",
        department: "",
        civilWork: "",
        skills: "",
        hobbies: "",
        describeYourself: "",
        achievemenets: "",
        // second step
        ieeeLettersAbv: "",
        whatDoYouKnowAboutIeee: "",
        whyDoYouWantToJoinIEEE: "",
        didAttendEvents: "",
        eventNames: "",
        // third step
        primaryCommittee: "",
        secondaryCommitee1: "",
        secondaryCommittee2: [],
        // fourth step
        ITExperience: "",
        technicalExperience: "",
        mediaExperience: "",
        documentationExperience: "",
        registrationExperience: "",
        operationExperience: "",
        // fifth step
        commitmentHours: "",
        ratherBeYourOwnBoss: "",
        setsYouApartFromCandidates: "",
        // sixth step
        howDidYouKnowAboutRecruitment: "",
        volunteersName: "",
        friendName: "",
        other: "",
    });
    let [stepSwitchErrorPopup, setStepSwitchErrorPopup] = useState(false);
    let [submitPopup, setSubmitPopup] = useState(false);

    let conditionalFields = {
        eventNames: data.didAttendEvents === "Yes",
        trial: false,
        primaryCommittee:
            data.faculty == "Faculty Of Computer and Information Technology" ||
            data.faculty == "Faculty Of Engineering",
        secondaryCommitee1:
            data.faculty == "Faculty Of Computer and Information Technology" ||
            data.faculty == "Faculty Of Engineering",
        secondaryCommittee2:
            data.faculty !== "Faculty Of Computer and Information Technology" &&
            data.faculty !== "Faculty Of Engineering",
        volunteersName: data.howDidYouKnowAboutRecruitment == "Volunteer",
        friendName: data.howDidYouKnowAboutRecruitment == "Friend",
        other: data.howDidYouKnowAboutRecruitment == "Other",
    };

    let formItems = (arrayOfFormItems, register, control, errors) => {
        return (
            <>
                {arrayOfFormItems.map((item) => {
                    /////////////////////////////////////////////////// Text
                    if (item.type === "text") {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <div className="fieldLabel">
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <InputField
                                                {...props}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    } else if (
                        item.type === "ConditionalText" &&
                        conditionalFields[item.stateName]
                    ) {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <div className="fieldLabel">
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <InputField
                                                {...props}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    }

                    /////////////////////////////////////////////////// dropDown
                    else if (item.type === "dropDown") {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <label className="fieldLabel">
                                    {item.fieldLabel}
                                </label>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <DropDown
                                                {...props}
                                                item={item}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    }
                    /////////////////////////////////////////////////// radioButton
                    else if (item.type === "radioButton") {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <div className="fieldLabel">
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <RadioButton
                                                {...props}
                                                data={data}
                                                setData={setData}
                                                item={item}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    } else if (
                        item.type === "ConditionalRadioButton" &&
                        conditionalFields[item.stateName]
                    ) {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <div className="fieldLabel">
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <RadioButton
                                                {...props}
                                                data={data}
                                                setData={setData}
                                                item={item}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    }
                    /////////////////////////////////////////////////// textArea
                    else if (item.type === "textArea") {
                        return (
                            <label key={item.id} className={"fieldContainer"}>
                                <div className={"fieldLabel"}>
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <TextArea
                                                {...props}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </label>
                        );
                    } else if (item.type === "textArea") {
                        return (
                            <label key={item.id} className={"fieldContainer"}>
                                <div className={"fieldLabel"}>
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <TextArea
                                                {...props}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </label>
                        );
                    }
                    /////////////////////////////////////////////////// specialRange
                    else if (item.type === "specialRange") {
                        return (
                            <div key={item.id} className="fieldContainer">
                                <div className={"fieldLabel"}>
                                    {item.fieldLabel}
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <SpecialRange
                                                {...props}
                                                data={data}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </div>
                        );
                    }
                    /////////////////////////////////////////////////// LimitedCheckBox
                    else if (
                        item.type === "LimitedCheckBox" &&
                        conditionalFields[item.stateName]
                    ) {
                        return (
                            <label key={item.id} className="fieldContainer">
                                <div className="fieldLabel">
                                    Choose your 2 secondary committees.
                                </div>
                                <Controller
                                    {...{
                                        control,
                                        register,
                                        name: item.stateName,
                                        rules: {
                                            required: "This field is required",
                                            pattern: {
                                                value: item.pattern,
                                                message: item.patternErrMsg,
                                            },
                                        },
                                        render: (props) => (
                                            <LimitedCheckBox
                                                {...props}
                                                data={data}
                                                item={item}
                                                setData={setData}
                                            />
                                        ),
                                    }}
                                />
                                {errors[item.stateName] && (
                                    <span className="validationErrorMessage">
                                        {errors[item.stateName].message}
                                    </span>
                                )}
                            </label>
                        );
                    }
                })}
            </>
        );
    };

    return (
        <FormDataContext.Provider
            value={{
                step,
                setStep,
                data,
                setData,
                formItems,
                conditionalFields,
                //
                stepSwitchErrorPopup,
                setStepSwitchErrorPopup,
                //
                submitPopup,
                setSubmitPopup, //
            }}
        >
            {children}
        </FormDataContext.Provider>
    );
};

export default FormDataContext;