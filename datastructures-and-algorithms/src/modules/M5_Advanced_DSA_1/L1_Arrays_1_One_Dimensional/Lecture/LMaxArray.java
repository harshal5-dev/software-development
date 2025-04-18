package modules.M5_Advanced_DSA_1.L1_Arrays_1_One_Dimensional.Lecture;

import java.util.Arrays;

public class LMaxArray {

  /*
   * Q Given arr[N]. create left Max and Right Max Array.
   * LMax[i] -> max of all elements from 0 to i.
   * RMax -> max of all elements from i to N-1.
   */
  static int[] findLeftMaxArray(int[] A) {
    int N = A.length;
    int[] ans = new int[N];

    ans[0] = A[0];

    for (int index = 1; index < N; index++) {
      ans[index] = Math.max(ans[index-1], A[index]);
    }

    return ans;
  }

  public static void main(String[] args) {
    int[] arr = { 1, -6, 3, 8, 4, 5, 2 };


    System.out.println();
    System.out.println("""
        Q Given arr[N]. create left Max and Right Max Array.
        LMax[i] -> max of all elements from 0 to i.
        RMax -> max of all elements from i to N-1.""");
    System.out.println("--------------------------------------------------");
    System.out.println("Time Complexity -> O(N)");
    System.out.println("Space Complexity -> O(1)");
    System.out.println("-----------------------------------");
    System.out.println("Input Array ->");
    System.out.println(Arrays.toString(arr));
    System.out.println("Output ->");
    System.out.println(Arrays.toString(findLeftMaxArray(arr)));
    System.out.println("-----------------------");
    System.out.println();
  }
}
