import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import useFetch from "../../hooks/useFetch";
import { useSidebar } from "../../hooks/useHandleSideBar";
import useAuthToken from "../../hooks/useAuth";
import EmptyLottie from "../components/common/EmptyLottie";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ProposalQuestions() {
  const { getItem } = useAuthToken();
  const { token, getUserDetail } = getItem();
  const { open, handleSideBar, handleSidebarItemClick } = useSidebar();
  const { proposalName, templateId } = useParams();
  const [templateAnswerid, setTemplateAnswerId] = useState();
  const [QuestionsAnswers, setQuestionsAnswers] = useState([]);
  const Questions = useFetch(
    `https://oppsapi.onrender.com/api/v1/proposal/get_questions/${templateId}/`
  );

  useEffect(() => {
    Questions.refetch(
      `https://oppsapi.onrender.com/api/v1/proposal/get_questions/${templateId}/`
    );
    const proposalId = localStorage.getItem("proposalId");
    setTemplateAnswerId(proposalId);

  }, [templateId]);

  const handleAswerChange = (id, answer) => {
    const questionIndex = QuestionsAnswers.findIndex(
      (item) => item.question === id
    );

    // If the question is already in QuestionsAnswers, update its answer
    if (questionIndex !== -1) {
      setQuestionsAnswers((prevState) => {
        const updatedQuestionsAnswers = [...prevState];
        updatedQuestionsAnswers[questionIndex] = {
          ...updatedQuestionsAnswers[questionIndex],
          answer: answer,
        };
        return updatedQuestionsAnswers;
      });
    } else {
      // If the question is not in QuestionsAnswers, add it
      setQuestionsAnswers((prevState) => [
        ...prevState,
        {
          question: id,
          answer: answer,
          proposal: templateAnswerid,
        },
      ]);
    }
    console.log(QuestionsAnswers);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('submited',QuestionsAnswers);
  try{
    const response = await fetch(
    `https://oppsapi.onrender.com/api/v1/proposal/add_proposal/answer/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify( 
         QuestionsAnswers
      ),
    }
  );
    const data = await response.json()
    console.log('returned',data)
    if (response.status === 200)
    {
      toast.success("Answers recieved.Redirecting to homepage...");
      setTimeout(() => {
        window.location.href = "/";
      }, 5000)
    } else {
      toast.error("An error occured, please try again later");
      }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <>
      {token !== null ? (
        <div>
          <ToastContainer />
          <Navbar
            handleSideBar={handleSideBar}
            open={open}
            getUserDetail={getUserDetail}
          />
          <Sidebar
            handleSideBar={handleSideBar}
            open={open}
            getUserDetail={getUserDetail}
          />
          <div className="p-12 h-full justify-start items-start w-full flex text-black md:pl-[350px]  flex-col  md:px-[200px]  ">
            <h5 className="text-blue-500  text-2xl underline my-5 font-bold uppercase  md:left-[250px] mt-20">
              {Questions?.data?.title}
            </h5>

            <ul>
              {Questions?.data?.questions?.length >= 1 ? (
                <form>
                  <p>
                    Aswer the following questions following the rulles set( Use
                    specified number of words)
                  </p>
                  {Questions?.data?.questions?.map((question) => (
                    <li
                      className="my-6 bg-[#f5f5f5] p-3 rounded-xl md:min-w-[450px] hover:border-l-blue-500 hover:border-l-4"
                      key={question.id}
                    >
                      <p className="flex flex-col gap-2">
                        <span className="font-semibold w-full">
                          {question.question}
                        </span>
                        <span className="font-light">
                          {question.marks} marks
                        </span>{" "}
                      </p>
                      <textarea
                        className="w-full resize-none font-thin outline-none mb-5 border-b-black border-b-2 hover:border-blue-500"
                        rows={5}
                        required
                        onChange={(e) =>
                          handleAswerChange(question.id, e.target.value)
                        }
                        cols={35}
                        maxLength={question.max_words}
                        placeholder="Your answer goes here..."
                      />
                      <p className="w-full text-right text-sm">
                        maximum words: {question.max_words}
                      </p>
                    </li>
                  ))}
                  <div className="flex flex-row justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-semibold text-center px-4 py-1"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button type="reset">Clear submission</button>
                  </div>
                </form>
              ) : (
                <div>
                  <EmptyLottie />
                  <p className="font-bold text-2xl"> No questions Yet!!</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default ProposalQuestions;
