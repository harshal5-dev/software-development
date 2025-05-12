package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L12_Bit_Manipulations_1.Assignment;

public class Assignment9 {

  int singleNumber(final int[] A) {
    int ans = 0;

    for (int ele: A) {
      ans ^= ele;
    }

    return ans;
  }
}
