import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const LowCreditDialog = ({
  open,
  setOpen,
  text,
  showLoginBtn,
  showOkBtn,
  handleOkClick,
  showBuyCreditsBtn,
}: {
  open?: boolean;
  setOpen?: Function;
  text?: string;
  showLoginBtn?: boolean;
  showOkBtn?: boolean;
  handleOkClick?: () => void;
  showBuyCreditsBtn?: boolean;
}) => {
  return (
    <div className='relative z-50'>
      <AlertDialog.Root
        open={open}
        onOpenChange={() => {
          if (setOpen) setOpen(false);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='z-50 bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0' />
          <AlertDialog.Content className='z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
            <AlertDialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
              You have Low Credits
            </AlertDialog.Title>
            <AlertDialog.Description className='text-mauve11 mt-4 mb-5 text-[15px] leading-normal'>
              {text}
            </AlertDialog.Description>
            <div className='flex justify-end gap-5'>
              <AlertDialog.Cancel asChild>
                <button className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none outline-none'>
                  Cancel
                </button>
              </AlertDialog.Cancel>
              {showLoginBtn && (
                <AlertDialog.Action asChild>
                  <div className='flex justify-center'>
                    <button
                      onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard" })
                      }
                      className='text-black bg-gray-200 hover:bg-gray-300 flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none outline-none'
                    >
                      <Image
                        alt="google's logo"
                        src='/_static/icons/google.webp'
                        width={20}
                        height={20}
                        decoding='async'
                        loading='lazy'
                        style={{ color: "transparent" }}
                      />
                      <span className='block mb-[1px] ml-[2px]'>
                        Sign in with Google
                      </span>
                    </button>
                  </div>
                </AlertDialog.Action>
              )}
              {showOkBtn && (
                <AlertDialog.Action asChild>
                  <div className='flex justify-center'>
                    <button
                      onClick={() => {
                        if (handleOkClick) handleOkClick();
                      }}
                      className='text-black bg-gray-200 hover:bg-gray-300 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none outline-none'
                    >
                      Ok
                    </button>
                  </div>
                </AlertDialog.Action>
              )}
              {showBuyCreditsBtn && (
                <AlertDialog.Action asChild>
                  <div className='flex justify-center'>
                    <Link
                      href='/buy-credits'
                      className='text-black bg-gray-200 hover:bg-gray-300 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] font-medium leading-none outline-none'
                    >
                      Buy more credits
                    </Link>
                  </div>
                </AlertDialog.Action>
              )}
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default LowCreditDialog;
