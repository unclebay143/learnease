import useLocalStorage from "@/lib/hooks/use-local-storage";
import { fetchUsersCount } from "@/lib/services";
import React, { useEffect, useState } from "react";

type Props = {};

const UsersCounter = (props: Props) => {
  const [cachedUsersCount, setCachedUsersCount] = useLocalStorage(
    "users_counter",
    0
  );

  const [usersCount, setUsersCount] = useState(null);

  useEffect(() => {
    fetchUsersCount().then((data) => {
      setUsersCount(data?.users_count);
      setCachedUsersCount(data?.users_count);
    });
  }, []);

  return (
    <section className='px-6 my-10 text-center'>
      <div className='inline px-4 py-2 text-sm font-semibold text-gray-700 border border-green-600 rounded-xl sm:text-base'>
        Over{" "}
        <span className='font-semibold text-green-600'>
          {usersCount || cachedUsersCount} users
        </span>{" "}
        have used LearnEase so far
      </div>
    </section>
  );
};

export default UsersCounter;
