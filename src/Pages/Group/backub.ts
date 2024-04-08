// const getGroupsByUser = async () => {
//     if (!token) {
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const res: AxiosResponse<Response> = await api.get<
//         Response,
//         AxiosResponse<Response>
//       >(
//         `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
//           limit
//         )}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const { group, numberOfTopics, isOwner } = res.data;

//       //  console.log("data", res.data);

//       setGroup({ ...group });

//       if (isOwner) {
//         setIsOwner(isOwner);
//       }

//       if (contentName === "members") {
//         setLimit(2);
//       } else if (contentName === "topics") {
//         setLimit(5);
//       }
//       //@ts-ignore
//       const totalPages = Math.ceil(total / limit);
//       const arrayPages = [];

//       for (let i = 1; i <= totalPages; i++) {
//         arrayPages.push(i);
//       }

//       setPages(arrayPages);
//       if (contentName === "members") {
//         setTotal(groupMembers.length);
//       } else if (contentName === "topics") {
//         setTotal(numberOfTopics);
//       }

//       setIsLoading(false);
//     } catch (err) {
//       setIsLoading(false);
//       return err;
//     }
//   };
