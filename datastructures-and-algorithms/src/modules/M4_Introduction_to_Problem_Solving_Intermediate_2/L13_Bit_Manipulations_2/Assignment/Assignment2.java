package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L13_Bit_Manipulations_2.Assignment;

public class Assignment2 {

  boolean checkIthBitSet(int A, int B) {
    return (A & (1 << B)) != 0;
  }

  int numSetBits(int A) {
    int ans = 0;

    for (int index = 0; index < 32; index++) {
      if (checkIthBitSet(A, index)) {
        ans++;
      }
    }

    return ans;
  }

  int numSetBits1(int A) {
    int ans = 0;

   while (A > 0) {
     if ((A & 1) == 1) {
       ans++;
     }
      A = A >> 1;
   }

    return ans;
  }
}
